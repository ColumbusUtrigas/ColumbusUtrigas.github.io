from http.server import BaseHTTPRequestHandler, HTTPServer
from datetime import datetime, timezone
import sqlite3
import socket
import ssl

def write_db_visit(date):
    c = conn.cursor()
    c.execute("INSERT INTO visits VALUES(?)", [date])
    conn.commit()

class HTTPServerV6(HTTPServer):
    address_family = socket.AF_INET6

class HandleRequests(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_GET(self):
        self._set_headers()

    def do_POST(self):
        self._set_headers()
        write_db_visit(datetime.now(timezone.utc).strftime("%Y/%m/%d %H:%M:%S"))

    def do_PUT(self):
        self.do_POST()

#SQLite connection
conn = sqlite3.connect('visits.db')
c = conn.cursor()
c.execute("CREATE TABLE IF NOT EXISTS visits (date TEXT)")
conn.commit()

keyPath = '/etc/letsencrypt/live/cutrigasvisitscounter.space/privkey.pem'
certPath = '/etc/letsencrypt/live/cutrigasvisitscounter.space/fullchain.pem'

#Server
server = HTTPServerV6(('::', 443), HandleRequests)
server.socket = ssl.wrap_socket (server.socket,  keyfile=keyPath, certfile=certPath, server_side=True)
server.serve_forever()
