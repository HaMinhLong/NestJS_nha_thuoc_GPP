# Sử dụng image Node.js 18 (bản ổn định mới nhất)
FROM node:18

# Đặt working directory là /app
WORKDIR /app

# Sao chép file package.json và package-lock.json vào working directory
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install
RUN npm rebuild bcrypt --build-from-source

# Sao chép source code vào working directory
COPY . .

# Chạy script build để biên dịch TypeORM entities
RUN npm run build

# Kiểm tra thư mục dist được tạo
RUN ls -la dist

# Copy wait-for-it.sh vào Docker image
COPY wait-for-it.sh /usr/local/bin/wait-for-it
RUN chmod +x /usr/local/bin/wait-for-it

# Lệnh khởi chạy ứng dụng và chờ MySQL sẵn sàng
CMD ["sh", "-c", "wait-for-it mysql:3306 -- npm run migration:run && npm run start:nodemon"]

# Expose port 3000 (mặc định của NestJS)
EXPOSE 3000