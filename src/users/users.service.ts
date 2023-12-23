import { Injectable } from '@nestjs/common';
import { CreateUesrsDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

import { PrismaService } from '../prisma/prisma.service';

import { Users, Logs } from './entities/users.entities';

@Injectable()
export class UsersService {
  constructor(private readonly PrismaService: PrismaService) {}

  // 회원 전체 조회
  async getAllUsers(): Promise<Users[]> {
    const getUsersData: Users[] = await this.PrismaService.users.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        sex: true,
        birth: true,
        postalCode: true,
        address: true,
        detailAddress: true,
        phone: true,
      },
    });
    if (!getUsersData) throw new Error('No Data');
    const allUsersInfo: Users[] = getUsersData.map((row) => {
      return {
        ...row,
        id: Number(row.id),
      };
    });
    return allUsersInfo;
  }

  // 로그 전체 조회
  async getLogs() {
    const getAllLogsData: Logs[] = await this.PrismaService.logs.findMany({
      select: {
        status: true,
        time: true,
        userId: true,
      },
    });
    if (!getAllLogsData) throw new Error('No Logs Data');
    // userId들을 추출
    const userIds: number[] = getAllLogsData.map((log) => Number(log.userId));
    // userIds를 이용하여 Users 테이블을 조회
    const usersData = await this.PrismaService.users.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    // logs 데이터에 Users 정보를 합치기
    const logsWithUsersInfo = getAllLogsData.map((log) => {
      const user = usersData.find((user) => user.id === log.userId);
      return {
        status: log.status,
        time: log.time,
        userId: log.userId,
        user: { name: user.name, email: user.email },
      };
    });
    return logsWithUsersInfo;
  }

  // 단일 회원 조회
  async getOneUser(id: number): Promise<Users> {
    const getUserData: Users = await this.PrismaService.users.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        sex: true,
        birth: true,
        postalCode: true,
        address: true,
        detailAddress: true,
        phone: true,
      },
    });
    if (!getUserData) throw new Error('No Data');
    const getUserInfo: Users = { ...getUserData, id: Number(getUserData.id) };
    return getUserInfo;
  }

  // 회원 추가
  async createUser(createData: CreateUesrsDto): Promise<number> {
    const insertUser: Users = await this.PrismaService.users.create({
      data: {
        email: createData.email,
        password: createData.password,
        name: createData.name,
        sex: createData.sex,
        birth: createData.birth,
        postalCode: createData.postalCode,
        address: createData.address,
        detailAddress: createData.detailAddress,
        phone: createData.phone,
      },
    });
    const insertId: number = Number(insertUser.id);
    const insertLogs: Logs = await this.PrismaService.logs.create({
      data: {
        status: '가입',
        userId: insertId,
      },
    });
    return insertId;
  }

  // 회원 정보 수정
  async updateUser(id: number, updateData: UpdateUsersDto) {
    const updateUser: Users = await this.PrismaService.users.update({
      where: {
        id,
      },
      data: {
        password: updateData.password,
        postalCode: updateData.postalCode,
        address: updateData.address,
        detailAddress: updateData.detailAddress,
        phone: updateData.phone,
        updateAt: new Date(),
      },
    });
    const updateId: number = Number(updateUser.id);
    const updateLogs: Logs = await this.PrismaService.logs.create({
      data: {
        status: '수정',
        userId: updateId,
      },
    });
    return updateId;
  }

  // 회원 삭제
  async deleteUser(id: number) {
    const deleteUser = await this.PrismaService.users.delete({
      where: { id },
    });
    const deleteId: number = Number(deleteUser.id);
    const deleteLogs: Logs = await this.PrismaService.logs.create({
      data: {
        status: '삭제',
        userId: deleteId,
      },
    });
    return deleteId;
  }
}
