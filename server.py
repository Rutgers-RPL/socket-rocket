import os
import asyncio
import serial.tools
import serial.tools.list_ports
from websockets.server import serve
import websockets
import struct
from fastcrc import crc32
import serial
import csv
import random
import functools
import time
import json

HOST = "127.0.0.1"  # localhost
PORT = 8765  # Port to listen on (non-privileged ports are > 1023)
STRUCT_SIZE = 106  # Set

# data_struct = struct.Struct('@ h I f f s s f f f f f f f f f f f f f f I')  # set
minerva_struct = '<II2f2B21fI'
serial_port = 'COM9'  # Set
baudrate = 115200

file_num = 0

while os.path.exists(f'data_{file_num}.csv'):
    file_num += 1

keys = [
		"status",
		"time_us",
		"main_voltage_v",
		"pyro_voltage_v",
		"satellites",
		"gpsFixType",
		"latitude",
		"longitude",
		"gps_hMSL_m",
		"barometer_hMSL_m",
		"temperature_c",
		"x_acceleration",
		"y_acceleration",
		"z_acceleration",
		"angular_velocity_x",
		"angular_velocity_y",
		"angular_velocity_z",
		"gauss_x",
		"gauss_y",
		"gauss_z",
		"acceleration",
		"velocity",
		"position",	
		"w",
		"x",
		"y",
		"z",
		"checksum"]

log_values = {}

client_list = []

#   short magic;                   // 2 bytes -   2 index #
#   unsigned int status;           // 4 byte  -   3 0
#   unsigned int time_us;          // 4 bytes -  7  1
#   float main_voltage_v;          // 4 bytes -  11 2
#   float pyro_voltage_v;          // 4 bytes -  15 3
#   byte numSatellites;            // 1 byte  -  16 4
#   byte gpsFixType;               // 1 byte  -  17 5
#   float latitude_degrees;        // 4 bytes -  21 6
#   float longitude_degrees;       // 4 bytes -  25 7
#   float gps_hMSL_m;              // 4 bytes -  29 8
#   float barometer_hMSL_m;        // 4 bytes -  33 9
#   float temperature_c;           // 4 bytes -  37 10
#   float acceleration_x_mss;      // 4 bytes -  41 11
#   float acceleration_y_mss;      // 4 bytes -  45 12
#   float acceleration_z_mss;      // 4 bytes -  59 13
#   float angular_velocity_x_rads; // 4 bytes -  53 14
#   float angular_velocity_y_rads; // 4 bytes -  57 15
#   float angular_velocity_z_rads; // 4 bytes -  61 16
#   float gauss_x;                 // 4 bytes -  65 17
#   float gauss_y;                 // 4 bytes -  79 18
#   float gauss_z;                 // 4 bytes -  73 19
#   float kf_acceleration_mss;     // 4 bytes -  77 20
#   float kf_velocity_ms;          // 4 bytes -  81 21
#   float kf_position_m;           // 4 bytes -  85 22
#   float w;                       // 4 bytes -  89 23
#   float x;                       // 4 bytes -  93 24
#   float y;                       // 4 bytes -  97 25
#   float z;                       // 4 bytes - 101 26
#   unsigned int checksum;         // 4 bytes - 105 27


def select_port():
    ports = serial.tools.list_ports.comports()

    if not ports:
        print("No Serial Ports found")
        return None
    i = 0
    for port in ports:
        print(f"{port.device}: {i}")
        i += 1
    ser_port_index = int(input("Select Port: "))
    return ports[ser_port_index].device
 
async def read_serial(ser, client_list):
    packet_num = 0

    while True:
        try:
            while ser is not None and ser.in_waiting > 108:
                packet_d = None
                if ser.read(1) == bytes.fromhex('ef'):
                    if ser.read(1) == bytes.fromhex('be'):
                        raw_data = ser.read(STRUCT_SIZE)
                        check_sum_window = raw_data[:-4]
                        unpacked_struct = struct.unpack(minerva_struct, raw_data)
                        python_checksum = crc32.mpeg_2(check_sum_window, initial=None)
                        
                        minerva_checksum = unpacked_struct[27]

                        # print("python: ", python_checksum)
                        # print("Ganesha: ", minerva_checksum)

                        # python_checksum = minerva_checksum

                        
                        if python_checksum == minerva_checksum:
                            packet_num += 1
                            if unpacked_struct[0] == 0:
                                print('cam off')
                            #print(unpacked_struct[0])
                            log_values = dict(zip(keys, unpacked_struct))
                            print(log_values['status'])
                            if 'time_us' in log_values:
                                log_values['time_us'] = time.time()                             
                            if packet_num == 5:
                                with open(f'data_{file_num}.csv', 'a', newline='') as file:
                                    writer = csv.DictWriter(file, fieldnames=keys)
                                    writer.writerow(log_values)
                                    #print('logged')
                                packet_num = 0
                            packet_d = log_values
                            packet_d = json.dumps(packet_d)  
                        #else:
                            #    continue
                if packet_d is None:
                    continue
                for client in client_list:
                    try:
                        await client.send(packet_d)
                    except websockets.exceptions.ConnectionClosed as err:
                        print(err)
        except serial.SerialException as err:
            print(err)

        # packet_d = {key: random.randrange(1,100) for key in keys}
        # packet_d['longitude'] = random.uniform(-180, 180)
        # packet_d['latitude'] = random.uniform(-90,90)
        

        await asyncio.sleep(0.1)


async def serial_write(ser, message):
    if ser is None:
        return
    message_bytes = message.encode("utf-8")
    await asyncio.to_thread(ser.write, message_bytes)

async def handle_client(websocket, ser):
    if websocket not in client_list:
        client_list.append(websocket)
        print('Client Connected')
    # print(client_list)
    
    async for message in websocket:
        #Any logic for client to server communication

        print('Message from client:', message)
        await serial_write(ser, message)
    # await websocket.send('Hi there!')

    await websocket.wait_closed()

    client_list.remove(websocket)
    print('Client Disconnected')


async def main():
    serial_port = select_port()
   # while not serial_port:
    #    serial_port = select_port() 
     #   time.sleep(1)
    try:
        ser = serial.Serial(port=serial_port, baudrate=baudrate)
    except serial.SerialException as err:
        print(err)
        ser = None
    server = await serve(functools.partial(handle_client, ser=ser), HOST, PORT)

    with open(f'data_{file_num}.csv', 'w', newline='') as file:
        writer = csv.DictWriter(file, fieldnames=keys)
        writer.writeheader()

    await read_serial(ser, client_list)

    # await server.wait_closed()
    await asyncio.get_running_loop().create_future()

asyncio.run(main())
