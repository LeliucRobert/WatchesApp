import json
from channels.generic.websocket import AsyncWebsocketConsumer

class WatchConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("watches", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("watches", self.channel_name)

    # Receive data from WebSocket (optional, if you want to send data from frontend)
    async def receive(self, text_data):
        data = json.loads(text_data)
        print("Received from client:", data)

    # This method is called when data is sent to the group
    async def send_watch(self, event):
        # This must match the `type` you use when sending
        await self.send(text_data=json.dumps(event["data"]))