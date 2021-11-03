import http from 'http';

export async function createHTTPServer(port = 3332) {
  const server = http.createServer();
  await start();

  return { server, stopHTTPServer };

  function start() {
    return new Promise<void>((resolve) => {
      server.listen(port, () => {
        console.log(`Serving on http://localhost:${port}`);
        resolve();
      });
    });
  }

  function stopHTTPServer() {
    return new Promise<void>((resolve) => {
      let serverClosed = false;

      server.close(() => {
        serverClosed = true;
        resolve();
      });

      setTimeout(() => {
        if (!serverClosed) resolve();
      }, 1000);
    });
  }
}
