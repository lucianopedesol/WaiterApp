import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User, IUserDocument } from '../../models/UserModel';
import { AuthRequest } from '../../types';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

// Lógica para registrar um novo usuário
export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { email, password, profile } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).send({ error: 'Este email já está em uso.' });
    }

    const user: IUserDocument = new User({ email, password, profile });
    await user.save();

    res.status(201).send({ message: 'Usuário registrado com sucesso!' });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao registrar usuário.' });
  }
};

// Lógica para autenticar e logar o usuário
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({ error: 'Credenciais inválidas.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Credenciais inválidas.' });
    }

    const token = jwt.sign({ id: user._id, email: user.email, profile: user.profile }, JWT_SECRET, { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao fazer login.' });
  }
};

// Lógica para obter o perfil do usuário logado
export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) {
      return res.status(404).send({ error: 'Usuário não encontrado.' });
    }
    res.send({ message: `Bem-vindo, ${user.email}!`, user });
  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar perfil do usuário.' });
  }
};
