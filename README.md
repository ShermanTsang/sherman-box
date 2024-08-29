# Sherman-box

This is my personal website frontend project.

I'm glad to share the website with you.

[Preview link ( Sherman's box)](https://shermant.com)

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/ShermanTsang/sherman-box?label=version)

## TechStacks

Notice: the stacks and the dependencies of the project maybe out of date.

| type      | stack       | memo         |
|-----------|-------------|--------------|
| Language  | JavaScript  |              |
| Framework | Nuxt2       |              |
| Framework | Vue2        | optional api |
| Style     | SCSS        |              |
| Style     | TailwindCSS | a small part |

## Config

| key              | example                     |
|------------------|-----------------------------|
| SERVER_HOST      | 0.0.0.0                     |
| SERVER_PORT      | 3000                        |
| SITE_NAME        | <string>                    |
| SITE_DESCRIPTION | <string>                    |
| SITE_KEYWORDS    | <string>                    |
| API_BASEURL      | https://api.shermant.com/v1 |
| OSS_BASEURL      | https://oss.shermant.com    |

## Usage

### Run on a server

#### Pull the project
```git
git pull https://github.com/ShermanTsang/sherman-box.git
```

#### Set configurations
```bash
mv .env-example .env
```
Then, set them.

#### Install dependencies
```bash
npm install
yarn i
pnpm i
bun i
```

#### Start
```bash
npm run dev
yarn run dev
pnpm run dev
bun run dev
```

### Ship with Docker

#### Pull the image
```bash
# pull from dockerhub
docker pull shermantsang/sherman-box:latest

# pull from github
docker pull ghcr.io/shermantsang/sherman-box:master
```
#### Launch a container

You need to pass required env options in command

```bash
docker run -d 
  -p 3000:3000 
  -e SERVER_HOST=0.0.0.0 
  -e SERVER_PORT=3000 
  -e SITE_NAME="曾小满的盒子-ShermanBox" 
  -e SITE_DESCRIPTION="recordMyLife" 
  -e SITE_KEYWORDS="曾小满,小满,个人网站,个人博客,ShareMan,ShareManT,ShareManTsang,ShermanT" 
  -e API_BASEURL="https://api.shermant.com/v1" 
  -e OSS_BASEURL="https://oss.shermant.com" 
  -e SERVICE_BAIDU_ANALYZE_ID="15a2c685afbd639a5537af013711da1e" 
  --name sherman-box-fronted 
  sherman-box:latest
  ```

### Play with PM2

#### Prepare
Pull the project, set configurations, install dependencies like the steps mentioned in `Usage > Run on a server`.

#### Start
A `pm2` configuration has included in project, you can customize your project instance by editing `.ecosystem.config.js`.

```bash
pm2 start
```


## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is open source and available under the MIT License.

I hope you find Sherman-Box useful! If you have any questions or feedback, please open an issue on GitHub.
