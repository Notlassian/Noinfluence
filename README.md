# Noinfluence

Welcome to Noinfluence, a collaborative workspace app designed to streamline team communication and project management. It enables users to create, share, and organize documents seamlessly, fostering a centralized knowledge base. With intuitive editing tools, Noinfluence enhances productivity and ensures teams stay aligned and informed.

## Quick Setup

Get your local environment up and running with these easy steps:

### Build the Environment

To construct the docker images needed for the application stack:

```bash
docker compose build
```

### Launch the Environment

Run the complete application in one command:

```bash
docker compose up
```

### Destruct the Environment

When it's time to teardown the application stack:

```bash
docker compose down
```

Embrace the simplicity of Noinfluence and watch your productivity soar!

## Important Notes

**Note**: For access to the environment files for the test environment, please contact **Ryan Trickett**.
You must place one in the /api folder and one in the /frontend.

**Note**: If you rebuild the environment, make sure to destruct it before running it again as the database and the API containers will not be in sync.