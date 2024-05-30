import express, { Express, Request, Response } from "express";
import cors from "cors";
import path from "path";
import { readFile, writeFile } from "fs";


const app: Express = express();
app.use(cors());
app.use(express.json());

const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is up!");
});


const readAllPosts = (cb: (posts: any[]) => any) => {
  let p = path.join(__dirname.replace('src', ''), "/db/posts.json");

  return readFile(p, { encoding: "utf-8" }, function (e, content) {
    if (e) throw e;
    let parsed = JSON.parse(content)
    cb(parsed)
    return parsed
  });
};

const readAllEvents = (cb: (user: any[]) => void) => {
  let p = path.join(__dirname.replace('src', ''), "/db/users.json");
  return readFile(p, { encoding: "utf-8" }, function (e, content) {
    if (e) throw e;
    let parsed: any[] = JSON.parse(content)
    cb(parsed)

  });
};


app.get("/api/posts", (req, res) => {

  readAllPosts((cbRes) => {
    res.send(cbRes);
    return cbRes
  })
})

app.get("/api/users", (req, res) => {

  readAllEvents((cbRes) => {
    res.send(cbRes);
    return cbRes
  })
});



app.post("/api/posts", (req: Request, res) => {
  let post = req.body
  console.log('Add: ', post);

  try {
    const p = path.join(__dirname.replace('src', ''), "/db/posts.json");

    readAllPosts((posts: any[]) => {


      let id = posts.length + 1
      const t = posts.map(i => i.id)
      console.log('t: ', t);
      const postMax = Math.max(...t)
      console.log('id: ', postMax);
      id = Math.max(id, postMax)
      if (id === postMax) {
        id += 1
      }
      console.log('new Id: ', id, postMax);
      const n = { ...post, id }
      const add = [...posts, n]


      writeFile(p, JSON.stringify(add), (saveRes) => {
        console.log('Save Res: ', saveRes);
        res.send(add)
      });
    })

  } catch (error) {
    res.send({ error: 'Delete Error' });
  }
});

app.put("/api/posts", (req: Request, res) => {
  let post = req.body
  console.log('Update: ', post);

  try {
    readAllPosts((posts: any[]) => {
      const old = posts.find(i => `${i.id}` === `${post.id}`)
      const up = { ...old, ...post }
      const upList = posts.map(i => i.id === up.id ? up : i)
      let p = path.join(__dirname.replace('src', ''), "/db/posts.json");
      writeFile(p, JSON.stringify(upList), cb => { })
      res.send(upList)
    })

  } catch (error) {
    res.send({ error: 'Delete Error' });
  }
});


app.delete("/api/deletePost/:id", (req, res) => {
  let post = req.params
  try {
    readAllPosts((posts: any[]) => {
      const fil = posts.filter(i => `${i.id}` !== `${post.id}`)
      let p = path.join(__dirname.replace('src', ''), "/db/posts.json");
      writeFile(p, JSON.stringify(fil), cb => { })
      res.send(fil)
    })

  } catch (error) {
    res.send({ error: 'Delete Error' });
  }
});


app.listen(port, () => {
  console.log(`🔋 Server is running at http://localhost:${port}`);
});

