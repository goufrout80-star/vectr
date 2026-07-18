# VECTR

An immersive industrial staffing website built with Next.js, TypeScript, Framer Motion, Lenis, and React Three Fiber.

## Experience

- Scroll-directed 3D industrial mobilization story
- Progressive editorial capability reveal
- Responsive Mission and Industries chapter systems
- Five-step talent application with local progress recovery
- Crew-request workflow with a Vercel-compatible webhook endpoint
- Reduced-motion support and responsive mobile navigation

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm start
```

The repository is configured for zero-config deployment on Vercel.

### Form delivery

The forms work in preview mode with no configuration. To deliver submissions to a CRM, automation, or email workflow, add this environment variable in Vercel:

```bash
VECTR_FORM_WEBHOOK=https://your-secure-endpoint.example/inquiries
```

VECTR sends a JSON payload to the endpoint. Keep the endpoint server-side and never expose its credentials through a `NEXT_PUBLIC_` variable.
