import asyncio
from websockets.server import serve
import websockets
import struct
import zlib
import serial

HOST = "127.0.0.1"  # localhost
PORT = 8765  # Port to listen on (non-privileged ports are > 1023)
STRUCT_SIZE = 105  # Set

data_struct = struct.Struct('@ h I f f s s f f f f f f f f f f f f f f I')  # set
serial_port = 'COM5'  # Set
baudrate = 9600

client_list = []

#   short magic;                   // 2 bytes -   2
#   unsigned int status;           // 4 byte  -   3
#   unsigned int time_us;          // 4 bytes -  7
#   float main_voltage_v;          // 4 bytes -  11
#   float pyro_voltage_v;          // 4 bytes -  15
#   byte numSatellites;            // 1 byte  -  16
#   byte gpsFixType;               // 1 byte  -  17
#   float latitude_degrees;        // 4 bytes -  21
#   float longitude_degrees;       // 4 bytes -  25
#   float gps_hMSL_m;              // 4 bytes -  29
#   float barometer_hMSL_m;        // 4 bytes -  33
#   float temperature_c;           // 4 bytes -  37
#   float acceleration_x_mss;      // 4 bytes -  41
#   float acceleration_y_mss;      // 4 bytes -  45
#   float acceleration_z_mss;      // 4 bytes -  59
#   float angular_velocity_x_rads; // 4 bytes -  53
#   float angular_velocity_y_rads; // 4 bytes -  57
#   float angular_velocity_z_rads; // 4 bytes -  61
#   float gauss_x;                 // 4 bytes -  65
#   float gauss_y;                 // 4 bytes -  79
#   float gauss_z;                 // 4 bytes -  73
#   float kf_acceleration_mss;     // 4 bytes -  77
#   float kf_velocity_ms;          // 4 bytes -  81
#   float kf_position_m;           // 4 bytes -  85
#   float w;                       // 4 bytes -  89
#   float x;                       // 4 bytes -  93
#   float y;                       // 4 bytes -  97
#   float z;                       // 4 bytes - 101
#   unsigned int checksum;         // 4 bytes - 105


# def select_port():
#     ports = serial.tools.list_ports.comports()
#
#     if not ports:
#         print("No Serial Ports found")
#         return None
#     i = 0
#     for port in ports:
#         print(f"{port.device}: {i}")
#         i += 1
#     ser_port_index = int(input("Select Port: "))
#     return ports[ser_port_index]


async def read_serial(ser, client_list):
    while True:
        packet_d = None
        try:
            if ser is not None and ser.in_waiting:
                if ser.read(1) == bytes.fromhex('ef'):
                    if ser.read(1) == bytes.fromhex('be'):
                        raw_data = ser.read(STRUCT_SIZE)
                        unpacked_struct = struct.unpack(data_struct, raw_data)
                        pythonChecksum = zlib.crc32(raw_data)
                        teensyChecksum = unpacked_struct[20]
                        print(unpacked_struct[2])  # time
                        if pythonChecksum == teensyChecksum:
                            # packet_s = dataStruct.unpack(raw)
                            packet_d = unpacked_struct
        except serial.SerialException as err:
            print(err)

        # print(packet_d)
        if packet_d is None:
            packet_d = 'No data'
        for client in client_list:
            try:
                await client.send(packet_d)
            except websockets.exceptions.ConnectionClosed as err:
                print(err)

        await asyncio.sleep(1)


async def handle_client(websocket):
    client_list.append(websocket)
    print('Client Connected')
    await websocket.send('Hi there!')

    await websocket.wait_closed()

    client_list.remove(websocket)
    print('Client Disconnected')


async def main():
    try:
        ser = serial.Serial(port=serial_port, baudrate=baudrate)
    except serial.SerialException as err:
        print(err)
        ser = None

    server = await serve(handle_client, HOST, PORT)

    await read_serial(ser, client_list)

    # await server.wait_closed()
    await asyncio.get_running_loop().create_future()

asyncio.run(main())
