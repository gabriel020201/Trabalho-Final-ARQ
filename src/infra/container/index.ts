// Container de Injeção de Dependência - InversifyJS
// ERRO: Bindings incorretos e imports faltando

import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { PrismaCarRepository } from '../database/prisma/PrismaCarRepository';
import { PrismaRentalRepository } from '../database/prisma/PrismaRentalRepository';
// ERRO: Falta importar as interfaces
// ERRO: Falta importar o UseCase

const container = new Container();

// ERRO: Binding incorreto - não especifica a interface
container.bind(TYPES.CarRepository).to(PrismaCarRepository);

// ERRO: Usando o símbolo com typo
container.bind(TYPES.RenatlRepository).to(PrismaRentalRepository);

// ERRO: Falta o binding do UseCase

export { container };
