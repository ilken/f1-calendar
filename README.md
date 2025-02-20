# F1 2025 Race Calendar

A modern Formula 1 race calendar for the 2025 season with timezone support.

## Demo

Check out the live demo: [F1 2025 Calendar](https://f1-calendar-one.vercel.app/)

![localhost_3000_(iPad Pro)](https://github.com/user-attachments/assets/0f1652b7-2a79-4981-816c-34ae2f426dfb)

## Features

- 🏎️ Complete 2025 F1 race schedule
- 🌍 Automatic timezone detection and conversion
- 🕒 Global timezone selector
- 📱 Fully responsive design
- 🌙 Dark mode optimized
- 🖼️ Background effects
- ♿ Accessibility focused
- 📱 PWA support

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Jotai for state management
- date-fns-tz for timezone handling
- Jest & React Testing Library
- Mantine UI components

## Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Run tests
yarn test

# Build for production
yarn build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing

```bash
# Run tests
yarn test

# Run tests in watch mode
yarn test:watch

# Generate coverage report
yarn test:coverage
```

## Project Structure

```
├── src/
│   ├── app/             # Next.js app router
│   ├── atoms/           # Jotai atoms
│   ├── components/      # React components
│   └── data/           # Static data
├── public/             # Static assets
│   ├── background/     # Background images
│   └── icons/         # App icons
└── tests/             # Test files
```

## Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn start` - Start production server
- `yarn test` - Run tests
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## Environment Variables

None required for basic setup.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

## Author

i14u

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
