import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

interface FormData {
  imageFile: File | null;
  imagePreviewUrl: string | null;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
  width: 90%;
  padding: 32px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const FormTitle = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 8px;
`;

const FormSubtitle = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 24px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const ImageInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border: 2px dashed #d1d5db;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  &:hover {
    border-color: #007bff;
    background-color: #f9fafb;
  }
`;

const ImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #9ca3af;
  font-size: 14px;
  text-align: center;
`;

const ImagePreview = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledButton = styled.button`
  padding: 8px 16px;
  background-color: #4F46E5;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  transition: background-color 0.3s, transform 0.1s;
  &:hover {
    background-color: #4338CA;
  }
  &:active {
    transform: scale(0.99);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
  padding: 2rem;
`;

export default function FileInput() {
  const [formData, setFormData] = useState<FormData>({
    imageFile: null,
    imagePreviewUrl: null,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreviewUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({
        ...prev,
        imageFile: null,
        imagePreviewUrl: null,
      }));
    }
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Dados do formulário:', formData);
    // Substituindo o alert por uma mensagem no console
    console.log('Dados enviados! Verifique o console para os detalhes.');

    // Você enviaria 'formData.imageFile' para o backend aqui.
    // Exemplo de como usar FormData para envio:
    // const form = new FormData();
    // form.append('name', formData.name);
    // if (formData.imageFile) {
    //   form.append('avatar', formData.imageFile);
    // }
    // fetch('/api/upload', { method: 'POST', body: form });
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit}>
        <FormField>
          <Label>Foto de Produto:</Label>
          <ImageInputContainer>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id="image-upload"
            />
            {formData.imagePreviewUrl ? (
              <ImagePreview src={formData.imagePreviewUrl} alt="Prévia da imagem selecionada" />
            ) : (
              <ImagePlaceholder>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1.5 4a.5.5 0 0 1 .5-.5h12a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V4Z"/>
                  <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-6Z"/>
                  <path d="M4 6.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-6Z" fill-rule="evenodd"/>
                </svg>
                <p>Selecionar uma imagem</p>
              </ImagePlaceholder>
            )}
            <StyledButton as="label" htmlFor="image-upload">
              {formData.imagePreviewUrl ? 'Alterar' : 'Selecionar'}
            </StyledButton>
          </ImageInputContainer>
        </FormField>
      </FormContainer>
    </Container>
  );
}
