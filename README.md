# Blog Aggregator CLI

A command-line blog aggregator built as part of the Boot.dev curriculum. This tool allows users to register, log in, follow feeds, and browse aggregated content directly from the terminal.

## Features

- User registration and login
- Add and manage RSS feeds
- Follow/unfollow feeds
- Browse aggregated posts
- View all users and feeds

## Installation

1. Clone the repository:
```bash
git clone https://github.com/msdmirzaei/gator
cd gator
```

2. Install dependencies:
```bash
npm install
```

3. start the project:
```bash
npm run start
```

## Usage

Run commands using:

```bash
node dist/index.js <command> [arguments]
```

## Commands

### Authentication
- `register <username>` — Create a new user
- `login <username>` — Log in as a user
- `reset` — Reset database

### Users
- `users` — List all users

### Feeds
- `addfeed <name> <url>` — Add a new feed (requires login)
- `feeds` — List all feeds

### Following
- `follow <url>` — Follow a feed (requires login)
- `following` — List followed feeds (requires login)
- `unfollow <url>` — Unfollow a feed (requires login)

### Aggregation
- `agg` — Run feed aggregation
- `browse` — Browse posts (requires login)

## Middleware

Certain commands require authentication. These are protected using middleware:
- addfeed
- follow
- following
- unfollow
- browse

## Error Handling

- Displays an error if no command is provided
- Requires username for login
- Validates command inputs

## Project Structure

- `index.ts` — Entry point
- `command_registry.ts` — Command handling system
- `*_handler.ts` — Individual command handlers
- `middleware.ts` — Authentication middleware

## Notes

- Make sure to log in before using protected commands.
- Ensure your database is properly configured before running aggregation.
