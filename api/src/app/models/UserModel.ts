import mongoose, { Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

// 1. Crie uma interface que define o tipo dos métodos da instância.
export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>;
}

// 2. Crie uma interface para o documento que combina o schema e os métodos.
// Essa é a interface que você usará para os resultados das suas queries.
export interface IUserDocument extends Document, IUserMethods {
  email: string;
  password?: string;
}

// 3. Crie uma interface para o próprio modelo.
export interface I_User_Model extends Model<IUserDocument> {}

// 4. Defina o esquema com a interface do documento.
const UserSchema: Schema<IUserDocument> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// 5. Criptografe a senha antes de salvar
UserSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// 6. Adicione o método de comparação da senha.
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// 7. Exporte o modelo com a tipagem correta.
export const User = mongoose.model<IUserDocument, I_User_Model>('User', UserSchema);
