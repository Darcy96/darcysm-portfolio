import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@darcysm/bastet-ui';
import type { SelectOption } from '@darcysm/bastet-ui';
import { contactSchema, SUBJECT_OPTIONS, type ContactFormData } from '@/validations/contact.schema';
import { sendContactEmail } from '@/actions/contact.actions';
import { useTranslations } from 'next-intl';

export function useContactForm() {
  const t = useTranslations('Contact');
  const toast = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: undefined,
      message: '',
    },
  });

  // Build select options from the enum with i18n labels
  const subjectOptions: SelectOption[] = SUBJECT_OPTIONS.map((key) => ({
    value: key,
    label: t(`subjects.${key}`),
  }));

  const onSubmit = async (data: ContactFormData) => {
    try {
      // Inject translated subject label so the backend doesn't need to guess the language
      const translatedLabel = t(`subjects.${data.subject}`);
      const result = await sendContactEmail({ ...data, subjectLabel: translatedLabel });

      if (result.success) {
        toast.success(t('toast.success'));
        reset();
      } else {
        toast.error(result.error || t('toast.error'));
      }
    } catch {
      toast.error(t('toast.error'));
    }
  };

  // Resolve i18n error messages from the Zod error keys
  const resolveError = (errorMsg?: string) => {
    if (!errorMsg) return undefined;
    // If the error key starts with 'validation.', treat it as an i18n key
    if (errorMsg.startsWith('validation.')) {
      return t(errorMsg);
    }
    return errorMsg;
  };

  const handleCopyEmail = () => {
    toast.success('Email copiado al portapapeles');
  };

  return {
    t,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    subjectOptions,
    resolveError,
    handleCopyEmail,
  };
}
