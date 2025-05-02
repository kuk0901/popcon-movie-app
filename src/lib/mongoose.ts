import mongoose from "mongoose";

const MONGODB_URL = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL must be defined");
}

// 글로벌 캐시 타입 선언
const globalWithMongoose = global;

// 캐시 객체 초기화
globalWithMongoose._mongoose ??= { conn: null, promise: null };

// mongoose 연결 정보 저장
const cached = globalWithMongoose._mongoose;

async function connectDB() {
  if (cached.conn) {
    // 이미 연결된 경우 재사용
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false
    };
    // 연결 시도 및 Promise 저장
    cached.promise = mongoose
      .connect(MONGODB_URL as string, opts)
      .then((mongoose) => mongoose);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
