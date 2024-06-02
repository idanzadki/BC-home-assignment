import { readFile } from "fs";
import path from "path";


export const readAllUsers = (cb: (user: any[]) => void) => {
    let p = __dirname.replace('\src', '').replace('\services', '')
    p = path.join(p, "/db/users.json");


    return readFile(p, { encoding: "utf-8" }, function (e, content) {
        if (e) throw e;
        let parsed: any[] = JSON.parse(content)
        cb(parsed)

    });
};

