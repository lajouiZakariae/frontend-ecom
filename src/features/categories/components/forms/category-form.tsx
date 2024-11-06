import { Form, FormikContextType, FormikProvider } from 'formik'
import { Button } from '@/components/ui/button'
import { TextFieldGroup } from '@/components/form-fields/text-field-group'
import { Category, CategoryFormValues } from '../../types'
import { useTranslation } from 'react-i18next'
import { ImageUpload } from '@/components/image-upload'
import { UploadedImage } from '@/components/image-upload/classes/uploaded-image'
import { SquareUploadPlaceholder } from '@/components/square-upload-placeholder'
import { Label } from '@/components/ui/label'
import { XIcon } from 'lucide-react'

interface CategoryFormProps extends FormikContextType<CategoryFormValues> {
    actionTitle: string
    oldValues?: Category
}

export const CategoryForm = ({ oldValues, actionTitle, ...formik }: CategoryFormProps) => {
    const { t } = useTranslation()

    return (
        <FormikProvider value={formik}>
            <Form className='space-y-4'>
                <div className='space-y-2'>
                    <Label htmlFor={'image'}>{t('Image')}</Label>

                    <ImageUpload
                        defaultImage={oldValues?.image?.url}
                        components={{
                            UploadPlaceholder: () => <SquareUploadPlaceholder />,
                            UploadErrorUI: () => <SquareUploadPlaceholder error />,
                            ImgRenderer: ({ imgSrc, clearImage }) => (
                                <div className='relative size-[150px] rounded-md'>
                                    <div
                                        className='absolute right-2 top-2 flex size-5 cursor-pointer items-center justify-center rounded-full bg-slate-800 transition hover:bg-slate-500'
                                        onClick={clearImage}
                                    >
                                        <XIcon className='size-4 text-slate-50' />
                                    </div>

                                    <img src={imgSrc} className='size-full object-cover' alt='Category image' />
                                </div>
                            ),
                        }}
                        onSuccessfulImageUpload={(file: UploadedImage) => {
                            formik.setFieldValue('image', file.getFile())
                        }}
                    />

                    <p className='mt-2 text-xs text-gray-500'>SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>

                <TextFieldGroup label={t('Name')} name='name' />

                <Button type='submit' className='w-full' disabled={formik.isSubmitting}>
                    {actionTitle}
                </Button>
            </Form>
        </FormikProvider>
    )
}
