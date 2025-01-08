module.exports = {
  roots: ['<rootDir>/src'], // Đảm bảo rằng jest sẽ tìm kiếm từ thư mục src
  moduleDirectories: ['node_modules', 'src'], // Tìm mô-đun trong cả 'node_modules' và 'src'
  moduleFileExtensions: ['js', 'json', 'ts'], // Đảm bảo jest có thể xử lý các file .ts
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Sử dụng ts-jest để biên dịch TypeScript
  },
  testMatch: ['**/?(*.)+(spec|test).ts'], // Tìm các file kiểm tra có phần mở rộng .spec.ts hoặc .test.ts
  testEnvironment: 'node', // Sử dụng môi trường Node.js
};
