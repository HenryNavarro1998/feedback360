import React, { useState, useEffect } from 'react';
import { 
  X as CloseIcon,
  Plus,
  Trash
} from "@phosphor-icons/react";
import { toast } from 'react-hot-toast';
import { EvaluationModelFormModalProps, FormData } from './types';
import {
  Overlay,
  Modal,
  ModalHeader,
  Title,
  CloseButton,
  Form,
  FormGroup,
  Label,
  Input,
  Textarea,
  QuestionsContainer,
  QuestionCard,
  OptionsContainer,
  OptionRow,
  ButtonsContainer,
  Button
} from './styles';

export const EvaluationModelFormModal: React.FC<EvaluationModelFormModalProps> = ({
  model,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    questions: []
  });

  useEffect(() => {
    if (model) {
      setFormData({
        name: model.name,
        description: model.description,
        questions: model.questions.map(q => ({
          text: q.text,
          options: q.options.map(o => ({
            text: o.text,
            score: o.score
          }))
        }))
      });
    }
  }, [model]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('El nombre del modelo es requerido');
      return;
    }

    if (!formData.questions.length) {
      toast.error('Debe agregar al menos una pregunta');
      return;
    }

    for (const question of formData.questions) {
      if (!question.text.trim()) {
        toast.error('Todas las preguntas deben tener un texto');
        return;
      }

      if (question.options.length < 2) {
        toast.error('Cada pregunta debe tener al menos dos opciones');
        return;
      }

      for (const option of question.options) {
        if (!option.text.trim()) {
          toast.error('Todas las opciones deben tener un texto');
          return;
        }
      }
    }

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error al guardar el modelo:', error);
    }
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { text: '', options: [] }]
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const updateQuestion = (index: number, text: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === index ? { ...q, text } : q
      )
    }));
  };

  const addOption = (questionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex
          ? { ...q, options: [...q.options, { text: '', score: 0 }] }
          : q
      )
    }));
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex
          ? { ...q, options: q.options.filter((_, j) => j !== optionIndex) }
          : q
      )
    }));
  };

  const updateOption = (
    questionIndex: number,
    optionIndex: number,
    field: 'text' | 'score',
    value: string | number
  ) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => 
        i === questionIndex
          ? {
              ...q,
              options: q.options.map((o, j) => 
                j === optionIndex
                  ? { ...o, [field]: value }
                  : o
              )
            }
          : q
      )
    }));
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <Title>{model ? 'Editar Modelo' : 'Nuevo Modelo'}</Title>
          <CloseButton onClick={onClose}>
            <CloseIcon size={20} />
          </CloseButton>
        </ModalHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Nombre</Label>
            <Input
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Nombre del modelo"
            />
          </FormGroup>

          <FormGroup>
            <Label>Descripción</Label>
            <Textarea
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descripción del modelo"
            />
          </FormGroup>

          <QuestionsContainer>
            {formData.questions.map((question, questionIndex) => (
              <QuestionCard key={questionIndex}>
                <FormGroup>
                  <Label>Pregunta {questionIndex + 1}</Label>
                  <Input
                    value={question.text}
                    onChange={e => updateQuestion(questionIndex, e.target.value)}
                    placeholder="Texto de la pregunta"
                  />
                </FormGroup>

                <OptionsContainer>
                  {question.options.map((option, optionIndex) => (
                    <OptionRow key={optionIndex}>
                      <Input
                        value={option.text}
                        onChange={e => updateOption(questionIndex, optionIndex, 'text', e.target.value)}
                        placeholder="Texto de la opción"
                      />
                      <Input
                        type="number"
                        value={option.score}
                        onChange={e => updateOption(questionIndex, optionIndex, 'score', Number(e.target.value))}
                        placeholder="Puntuación"
                        style={{ width: '100px' }}
                      />
                      <Button
                        type="button"
                        onClick={() => removeOption(questionIndex, optionIndex)}
                      >
                        <Trash size={20} />
                      </Button>
                    </OptionRow>
                  ))}

                  <Button
                    type="button"
                    onClick={() => addOption(questionIndex)}
                  >
                    <Plus size={20} />
                    Agregar Opción
                  </Button>
                </OptionsContainer>

                <ButtonsContainer>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => removeQuestion(questionIndex)}
                  >
                    <Trash size={20} />
                    Eliminar Pregunta
                  </Button>
                </ButtonsContainer>
              </QuestionCard>
            ))}

            <Button
              type="button"
              onClick={addQuestion}
            >
              <Plus size={20} />
              Agregar Pregunta
            </Button>
          </QuestionsContainer>

          <ButtonsContainer>
            <Button
              type="button"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
            >
              {model ? 'Actualizar' : 'Crear'} Modelo
            </Button>
          </ButtonsContainer>
        </Form>
      </Modal>
    </Overlay>
  );
}; 