FROM cypress/included:15.18.1

# Set the working directory
WORKDIR /app

# Copy package files to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install project dependencies
RUN npm ci

# Copy all project files (except those in .dockerignore)
COPY . .

# Set default command to run Cypress tests in headless mode
ENTRYPOINT ["npx", "cypress", "run"]
