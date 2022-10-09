class Server {
  constructor(port, express, router) {
    this.port = port;
    this.app = express();
    this.app.use(express.json());
    this.router = router;
    this.app.use("/api/v1", this.router);
    this.initDB();
    this.init();
  }

  initDB() {}

  init() {
    this.app.listen(this.port, () =>
      console.log("SERVER IS UP AND RUNNING ON PORT " + this.port.toString())
    );
  }
}

module.exports = { Server };
