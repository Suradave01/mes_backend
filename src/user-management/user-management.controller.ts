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
export class UserManagementController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @UseGuards(AuthGuard())
  @Post('createPartition')
  createPartition(
    @Body() createPartitionDto: CreatePartitionDto,
    @GetUser() user: UserModel,
  ) {
    return this.userManagementService.createPartition(createPartitionDto, user);
  }

  @UseGuards(AuthGuard())
  @Get('findAllPartition')
  findAllPartition() {
    return this.userManagementService.findAllPartition();
  }

  @UseGuards(AuthGuard())
  @Get('findAllPartitionActive')
  findAllPartitionActive() {
    return this.userManagementService.findAllPartitionActive();
  }

  @Get('findOnePartition/:id')
  findOnePartition(@Param('id') id: number) {
    return this.userManagementService.findOnePartition(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStatePartitionActive/:id')
  updateStatePartitionActive(@Param('id') id: number) {
    return this.userManagementService.updateStatePartitionActive(id);
  }

  @UseGuards(AuthGuard())
  @Delete('removePartition/:id')
  removePartition(@Param('id') id: number) {
    return this.userManagementService.removePartition(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updatePartition/:id')
  updatePartition(
    @Param('id') id: number,
    @Body() updatePartitionDto: UpdatePartitionDto,
  ) {
    return this.userManagementService.updatePartition(+id, updatePartitionDto);
  }

  @UseGuards(AuthGuard())
  @Post('createGroup')
  createGroup(@Body() createGroupDto: CreateGroupDto) {
    return this.userManagementService.createGroup(createGroupDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllGroup')
  findAllGroup() {
    return this.userManagementService.findAllGroup();
  }

  @UseGuards(AuthGuard())
  @Get('findAllGroupActive')
  findAllGroupActive() {
    return this.userManagementService.findAllGroupActive();
  }

  @Get('findOneGroup/:id')
  findOneGroup(@Param('id') id: number) {
    return this.userManagementService.findOneGroup(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateGroupActive/:id')
  updateStateGroupActive(@Param('id') id: number) {
    return this.userManagementService.updateStateGroupActive(id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeGroup/:id')
  removeGroup(@Param('id') id: number) {
    return this.userManagementService.removeGroup(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateGroup/:id')
  updateGroup(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto) {
    return this.userManagementService.updateGroup(+id, updateGroupDto);
  }

  @UseGuards(AuthGuard())
  @Post('createRole')
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.userManagementService.createRole(createRoleDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllRole')
  findAllRole() {
    return this.userManagementService.findAllRole();
  }

  @UseGuards(AuthGuard())
  @Get('findAllRoleActive')
  findAllRoleActive() {
    return this.userManagementService.findAllRoleActive();
  }

  @Get('findOneRole/:id')
  findOneRole(@Param('id') id: number) {
    return this.userManagementService.findOneRole(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateRoleActive/:id')
  updateStateRoleActive(@Param('id') id: number) {
    return this.userManagementService.updateStateRoleActive(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeRole/:id')
  removeRole(@Param('id') id: number) {
    return this.userManagementService.removeRole(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateRole/:id')
  updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.userManagementService.updateRole(+id, updateRoleDto);
  }

  @UseGuards(AuthGuard())
  @Post('createPermission')
  createPermission(@Body() createPermissionDto: CreatePermissionDto) {
    return this.userManagementService.createPermission(createPermissionDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllPermission')
  findAllPermission() {
    return this.userManagementService.findAllPermission();
  }

  @UseGuards(AuthGuard())
  @Get('findAllPermissionActive')
  findAllPermissionActive() {
    return this.userManagementService.findAllPermissionActive();
  }

  @Get('findOnePermission/:id')
  findOnePermission(@Param('id') id: number) {
    return this.userManagementService.findOnePermission(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStatePermissionActive/:id')
  updateStatePermissionActive(@Param('id') id: number) {
    return this.userManagementService.updateStatePermissionActive(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removePermission/:id')
  removePermission(@Param('id') id: number) {
    return this.userManagementService.removePermission(+id);
  }

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
  @Post('createResource')
  createResource(@Body() createResourceDto: CreateResourceDto) {
    return this.userManagementService.createResource(createResourceDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllResource')
  findAllResource() {
    return this.userManagementService.findAllResource();
  }

  @UseGuards(AuthGuard())
  @Get('findAllResourceActive')
  findAllResourceActive() {
    return this.userManagementService.findAllResourceActive();
  }

  @Get('findOneResource/:id')
  findOneResource(@Param('id') id: number) {
    return this.userManagementService.findOneResource(+id);
  }

  @UseGuards(AuthGuard())
  @Get('findAllResourceMenu')
  findAllResourceMenu() {
    return this.userManagementService.findAllResourceMenu();
  }

  @UseGuards(AuthGuard())
  @Get('findAllResourceEntity')
  findAllResourceEntity() {
    return this.userManagementService.findAllResourceEntity();
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateResourceActive/:id')
  updateStateResourceActive(@Param('id') id: number) {
    return this.userManagementService.updateStateResourceActive(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeResource/:id')
  removeResource(@Param('id') id: number) {
    return this.userManagementService.removeResource(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateResource/:id')
  updateResource(
    @Param('id') id: number,
    @Body() updateResourceDto: UpdateResourceDto,
  ) {
    return this.userManagementService.updateResource(+id, updateResourceDto);
  }

  @UseGuards(AuthGuard())
  @Post('createUser')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userManagementService.createUser(createUserDto);
  }

  @UseGuards(AuthGuard())
  @Get('findAllUser')
  findAllUser() {
    return this.userManagementService.findAllUser();
  }

  @UseGuards(AuthGuard())
  @Get('findAllUserMenu')
  findAllUserMenu(@GetUser() user: UserModel) {
    return this.userManagementService.findAllUserMenu(user);
  }

  @UseGuards(AuthGuard())
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

  @UseGuards(AuthGuard())
  @Patch('updateStateUserActive/:id')
  updateStateUserActive(@Param('id') id: number) {
    return this.userManagementService.updateStateUserActive(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateStateUserInactive/:id')
  updateStateUserInactive(@Param('id') id: number) {
    return this.userManagementService.updateStateUserInactive(+id);
  }

  @UseGuards(AuthGuard())
  @Delete('removeUser/:id')
  removeUser(@Param('id') id: number) {
    return this.userManagementService.removeUser(+id);
  }

  @UseGuards(AuthGuard())
  @Patch('updateUser/:id')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userManagementService.updateUser(+id, updateUserDto);
  }
}
