# Sử dụng image Node.js để xây dựng project NestJS
FROM node:14

# Cài đặt các phụ thuộc cần thiết
WORKDIR /app
COPY package*.json ./
RUN npm install

# Sao chép mã nguồn của project vào container
COPY . .

# Chạy script build của NestJS
RUN npm run build

# Chạy ứng dụng NestJS
CMD [ "npm", "run", "start:dev" ]