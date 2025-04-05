FROM node:23.9.0-alpine3.21

# Set working directory within Docker
WORKDIR /src/

# Install dependencies within Docker
COPY package.json package-lock.json ./
RUN npm install

# Copy files into Docker
COPY . .

# Expose port 3000 and start app
EXPOSE 3000
CMD ["npm", "run", "dev"]