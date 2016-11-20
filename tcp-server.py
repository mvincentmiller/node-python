import SocketServer
from blessings import Terminal

URL = '127.0.0.1'
PORT = 4001

t = Terminal()

class MyTCPServer(SocketServer.ThreadingTCPServer):
    allow_reuse_address = True

class MyTCPServerHandler(SocketServer.BaseRequestHandler):
    def handle(self):
        try:
            data = (self.request.recv(1024).decode('UTF-8'))
            print "\n\n RECIEVED:  \n\n" + data + "\n"

        except Exception as e:
            print("EXCEPTION: ", e)

class TCPServer():
    @staticmethod
    def start():
        print t.bold('\n Python TCP server started at ' + URL + '/' + str(PORT))
        if __name__ == '__main__':
        	server = MyTCPServer((URL, PORT), MyTCPServerHandler)
        	server.serve_forever()



# print t.bold('Hi there!')
# print t.bold_red_on_bright_green('It hurts my eyes!')
#
# with t.location(0, t.height - 1):
#     print 'This is at the bottom.'

TCPServer.start()
