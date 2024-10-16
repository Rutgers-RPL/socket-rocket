import asyncio
from websockets.sync.client import connect


async def hello():
    with connect("ws://localhost:8765") as websocket:
        print('connected')
        while True:
            message = websocket.recv()
            print(f"Received: {message}")


asyncio.run(hello())
