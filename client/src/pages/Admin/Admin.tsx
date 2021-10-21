import './Admin.css';
import { AppService } from '../../services/App.service';
import { useForm } from 'react-hook-form';

function Admin() {
	type FormValues = {
		name: string;
		album: string;
		image: FileList;
	};
	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

	const onSubmit = async (form: FormValues) => {
		const appService = new AppService();

		const { data } = await appService.postAlbum({ name: form.name, album: form.album });
        appService.postAlbumImage(data['_id'], form.image[0])
	};

	return (
		<div onSubmit={handleSubmit(onSubmit)}>
			<h1>Admin</h1>
			<form>
				<div>
					<label htmlFor="name">Name</label>
					<input type="text" {...register('name')} id="name" />
				</div>
				<div>
					<label htmlFor="album">Album</label>
					<input type="text" {...register('album', { required: true })} id="album" />
					{errors.album && <p>Required</p>}
				</div>
				<div>
					<label htmlFor="image">Image</label>
					<input type="file" {...register('image', { required: true })} id="image" />
					{errors.image && <p>Required</p>}
				</div>
				<div>
					<button type="submit">Send</button>
				</div>
			</form>
		</div>
	);
}

export default Admin;
