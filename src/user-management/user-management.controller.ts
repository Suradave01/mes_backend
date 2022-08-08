/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Body,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserManagementService } from './user-management.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateResourceDto } from './dto/create-resource.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { CreatePartitionDto } from './dto/create-partition.dto';
import { CreateGroupDto } from './dto/create-group.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import express from 'express';
import { UpdatePartitionDto } from './dto/update-partition.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { AuthCredentialsDto } from '../authentication/dto/authCredentials.dto';
import { AuthGuard } from '@nestjs/passport';
import line from '@line/bot-sdk';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from '../authentication/get-user.decorator';
import { UserModel } from './entities/user.entity';
@ApiTags('user-management')
@Controller('user-management')
@UseGuards(AuthGuard())
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @Post('createPartition')
  createPartition(
    @Body() createPartitionDto: CreatePartitionDto,
    @GetUser() user: UserModel,
  ) {
    return this.userManagementService.createPartition(createPartitionDto, user);
  }

  @Get('findAllPartition')
  findAllPartition() {
    return this.userManagementService.findAllPartition();
  }

  @Get('findAllPartitionActive')
  findAllPartitionActive() {
    return this.userManagementService.findAllPartitionActive();
  }

  @Get('findOnePartition/:id')
  findOnePartition(@Param('id') id: number) {
    return this.userManagementService.findOnePartition(+id);
  }

  @Patch('updateStatePartitionActive/:id')
  updateStatePartitionActive(@Param('id') id: number) {
    return this.userManagementService.updateStatePartitionActive(id);
  }

  @Delete('removePartition/:id')
  removePartition(@Param('id') id: number) {
    return this.userManagementService.removePartition(+id);
  }

  @Patch('updatePartition/:id')
  updatePartition(
    @Param('id') id: number,
    @Body() updatePartitionDto: UpdatePartitionDto,
  ) {
    return this.userManagementService.updatePartition(+id, updatePartitionDto);
  }

  @Post('createGroup')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.userManagementService.createGroup(createGroupDto);
  }

  @Get('findAllGroup')
  findAllGroup() {
    return this.userManagementService.findAllGroup();
  }

  @Get('findAllGroupActive')
  findAllGroupActive() {
    return this.userManagementService.findAllGroupActive();
  }

  @Get('findOneGroup/:id')
  findOneGroup(@Param('id') id: number) {
    return this.userManagementService.findOneGroup(+id);
  }

  @Patch('updateStateGroupActive/:id')
  updateStateGroupActive(@Param('id') id: number) {
    return this.userManagementService.updateStateGroupActive(id);
  }

  @Delete('removeGroup/:id')
  removeGroup(@Param('id') id: number) {
    return this.userManagementService.removeGroup(+id);
  }

  @Patch('updateGroup/:id')
  updateGroup(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.userManagementService.updateGroup(+id, updateGroupDto);
  }

  @Post('createRole')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.userManagementService.createRole(createRoleDto);
  }

  @Get('findAllRole')
  findAllRole() {
    return this.userManagementService.findAllRole();
  }

  @Get('findAllRoleActive')
  findAllRoleActive() {
    return this.userManagementService.findAllRoleActive();
  }

  @Get('findOneRole/:id')
  findOneRole(@Param('id') id: number) {
    return this.userManagementService.findOneRole(+id);
  }

  @Patch('updateStateRoleActive/:id')
  updateStateRoleActive(@Param('id') id: number) {
    return this.userManagementService.updateStateRoleActive(+id);
  }

  @Delete('removeRole/:id')
  removeRole(@Param('id') id: number) {
    return this.userManagementService.removeRole(+id);
  }

  @Patch('updateRole/:id')
  updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.userManagementService.updateRole(+id, updateRoleDto);
  }

  @Post('createPermission')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.userManagementService.createPermission(createPermissionDto);
  }

  @Get('findAllPermission')
  findAllPermission() {
    return this.userManagementService.findAllPermission();
  }

  @Get('findAllPermissionActive')
  findAllPermissionActive() {
    return this.userManagementService.findAllPermissionActive();
  }

  @Get('findOnePermission/:id')
  findOnePermission(@Param('id') id: number) {
    return this.userManagementService.findOnePermission(+id);
  }

  @Patch('updateStatePermissionActive/:id')
  updateStatePermissionActive(@Param('id') id: number) {
    return this.userManagementService.updateStatePermissionActive(+id);
  }

  @Delete('removePermission/:id')
  removePermission(@Param('id') id: number) {
    return this.userManagementService.removePermission(+id);
  }

  @Patch('updatePermission/:id')
  updatePermission(
    @Param('id') id: number,
    @Body() updatePermissionDto: UpdatePermissionDto,
  ) {
    return this.userManagementService.updatePermission(
      +id,
      updatePermissionDto,
    );
  }

  @Post('createResource')
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.userManagementService.createResource(createResourceDto);
  }

  @Get('findAllResource')
  findAllResource() {
    return this.userManagementService.findAllResource();
  }

  @Get('findAllResourceActive')
  findAllResourceActive() {
    return this.userManagementService.findAllResourceActive();
  }

  @Get('findOneResource/:id')
  findOneResource(@Param('id') id: number) {
    return this.userManagementService.findOneResource(+id);
  }

  @Get('findAllResourceMenu')
  findAllResourceMenu() {
    return this.userManagementService.findAllResourceMenu();
  }

  @Get('findAllResourceEntity')
  findAllResourceEntity() {
    return this.userManagementService.findAllResourceEntity();
  }

  @Patch('updateStateResourceActive/:id')
  updateStateResourceActive(@Param('id') id: number) {
    return this.userManagementService.updateStateResourceActive(+id);
  }

  @Delete('removeResource/:id')
  removeResource(@Param('id') id: number) {
    return this.userManagementService.removeResource(+id);
  }

  @Patch('updateResource/:id')
  updateResource(
    @Param('id') id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.userManagementService.updateResource(+id, updateResourceDto);
  }

  @Post('createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userManagementService.createUser(createUserDto);
  }

  @Get('findAllUser')
  findAllUser() {
    return this.userManagementService.findAllUser();
  }

  @Post('findAllUserServerSide')
  findAllUser_ServerSide(
    @Body() options: any,
    @Req() req: any,
    @Res() res: any,
  ) {
    console.log(req.body);

    return this.userManagementService.findAllUser_ServerSide(
      req.body,
      (rows: any, lastRow: any) => {
        res.json({ rows: rows, lastRow: lastRow });
      },
    );
  }

  @Get('findOneUser/:id')
  findOneUser(@Param('id') id: number) {
    return this.userManagementService.findOneUser(+id);
  }

  @Patch('updateStateUserActive/:id')
  updateStateUserActive(@Param('id') id: number) {
    return this.userManagementService.updateStateUserActive(+id);
  }

  @Patch('updateStateUserInactive/:id')
  updateStateUserInactive(@Param('id') id: number) {
    return this.userManagementService.updateStateUserInactive(+id);
  }

  @Delete('removeUser/:id')
  removeUser(@Param('id') id: number) {
    return this.userManagementService.removeUser(+id);
  }

  @Patch('updateUser/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userManagementService.updateUser(+id, updateUserDto);
  }
}
