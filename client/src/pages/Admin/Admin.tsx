import './Admin.css';
import { AppService } from '../../services/App.service';
import { useForm } from 'react-hook-form';

function Admin() {
	type FormValues = {
		album: string;
		images: File[];
	};
	const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

	const onSubmit = async (form: FormValues) => {
		const appService = new AppService();

		for (const image of form.images) {
			const { data } = await appService.postAlbum({ name: image.name, album: form.album });
			appService.postAlbumImage(data['_id'], image);
		}
	};

	return (
		<div className="admin-container">
			<div className="box">
				<h1>Admin</h1>
				<form onSubmit={handleSubmit(onSubmit)}>
					<h2>Add images to album</h2>
					<div className="row">
						<div>
							<label htmlFor="album">Album</label>
							<input type="text" {...register('album', { required: true })} id="album" />
							{errors.album && <p>Required</p>}
						</div>
						<div>
							<label htmlFor="image">Image</label>
							<input
								type="file"
								{...register('images', { required: true })}
								id="images"
								multiple={true}
							/>
							{errors.images && <p>Required</p>}
						</div>
					</div>
					<button type="submit">Send</button>
				</form>
			</div>
		</div>
	);
}

export default Admin;
