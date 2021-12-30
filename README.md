# Koi Anime List
Simple anime and manga tracker with a unique and accurate rating system
Here to answer the eternal question - which anime, manga, character, and song is objectively most popular?

## Why?
Ever wanted a simplistic web app with a modern design to store and track your anime and manga progress without the bloat of the social aspect? Me too! Additionally all other anime trackers choose to have users rate media on a 5 or 10 star scale. Koi Anime goes against the grain and only allows users to vote for their favorites from their list in random matchups. This allows the app to generate user-level and global rankings for anime, manga, female characters, male characters, opening themes, and ending themes. Now we will finally have an answer to some of the world's most pressing questions like "who is true best girl?" 😂 

## Getting Started
Prerequisite:

- PostgreSQL local database 
- npm
- yarn
- expo cli

Setup

1. Clone repo
1. `yarn`
1. Create `.env` file if one does not already exist in `packages/server`
1. Add connection URL for database and other environment variables to .env ([example .env file here](https://gist.github.com/jwyce/dfbfa259616acb4ab513787cee17c16d))
1. Watch dev server `yarn watch:server`
1. Run dev server `yarn server:dev`
1. Run dev web `yarn web:dev`
1. Run expo mobile app `yarn app`

## TODO
- [x] add getting started section to README
- [x] build user library page
- [ ] build voting page
- [ ] build top rated page
- [ ] make web responsive + fix light mode
- [ ] create email templates
- [ ] deploy backend containers to vultr or digitalocean
- [ ] deploy web frontend to vercel
- [ ] add unit tests with jest
- [ ] add integration tests with react testing library
- [ ] react native mobile development
- [ ] feedback tracker
- [ ] integrate with youtube api to play songs while voting
- [ ] sync with mal, kitsu, anilist
- [ ] support google/github oauth