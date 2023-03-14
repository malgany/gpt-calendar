import {startClient, start} from "./venom.js"


startClient()
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    })