import { useState, useEffect } from 'react';
import { FormData, FormErrors, QuestionFormData, OptionFormData } from '../types';
import { EvaluationModel } from '../../../../pages/evaluations/EvaluationsPage/types';

export const useEvaluationModelForm = (
  initialData?: EvaluationModel,
  onSubmit?: (data: Partial<EvaluationModel>) => Promise<void>
) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    questions: []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        questions: initialData.questions
      });
    }
  }, [initialData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es requerida';
    }

    if (!formData.questions.length) {
      newErrors.questions = [{ text: 'Debe agregar al menos una pregunta' }];
    } else {
      newErrors.questions = formData.questions.map(question => {
        const questionErrors: { text?: string; options?: { text?: string; score?: string }[] } = {};

        if (!question.text.trim()) {
          questionErrors.text = 'La pregunta es requerida';
        }

        if (!question.options.length) {
          questionErrors.options = [{ text: 'Debe agregar al menos una opción' }];
        } else {
          questionErrors.options = question.options.map(option => {
            const optionErrors: { text?: string; score?: string } = {};

            if (!option.text.trim()) {
              optionErrors.text = 'El texto de la opción es requerido';
            }

            if (option.score < 0 || option.score > 10) {
              optionErrors.score = 'El puntaje debe estar entre 0 y 10';
            }

            return Object.keys(optionErrors).length ? optionErrors : undefined;
          }).filter(Boolean);

          if (!questionErrors.options.length) {
            delete questionErrors.options;
          }
        }

        return Object.keys(questionErrors).length ? questionErrors : undefined;
      }).filter(Boolean);

      if (!newErrors.questions.length) {
        delete newErrors.questions;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm() && onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(formData);
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const addQuestion = () => {
    const newQuestion: QuestionFormData = {
      text: '',
      options: []
    };
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));
  };

  const updateQuestion = (index: number, question: QuestionFormData) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((q, i) => i === index ? question : q)
    }));
  };

  const removeQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const addOption = (questionIndex: number) => {
    const newOption: OptionFormData = {
      text: '',
      score: 0
    };
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, i) => {
        if (i === questionIndex) {
          return {
            ...question,
            options: [...question.options, newOption]
          };
        }
        return question;
      })
    }));
  };

  const updateOption = (questionIndex: number, optionIndex: number, option: OptionFormData) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, i) => {
        if (i === questionIndex) {
          return {
            ...question,
            options: question.options.map((opt, j) => j === optionIndex ? option : opt)
          };
        }
        return question;
      })
    }));
  };

  const removeOption = (questionIndex: number, optionIndex: number) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.map((question, i) => {
        if (i === questionIndex) {
          return {
            ...question,
            options: question.options.filter((_, j) => j !== optionIndex)
          };
        }
        return question;
      })
    }));
  };

  return {
    formData,
    errors,
    isSubmitting,
    updateFormData,
    addQuestion,
    updateQuestion,
    removeQuestion,
    addOption,
    updateOption,
    removeOption,
    handleSubmit
  };
}; 