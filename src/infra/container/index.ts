
import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { PrismaCarRepository } from '../database/prisma/PrismaCarRepository';
import { PrismaRentalRepository } from '../database/prisma/PrismaRentalRepository';

const container = new Container();

container.bind(TYPES.CarRepository).to(PrismaCarRepository);

container.bind(TYPES.RenatlRepository).to(PrismaRentalRepository);

export { container };
