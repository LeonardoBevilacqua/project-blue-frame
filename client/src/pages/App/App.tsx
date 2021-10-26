import { useEffect, useState } from 'react';
import { AppService } from '../../services/App.service';
import './App.css';

function App() {
	const [ frontImageHidden, setFrontImageHidden ] = useState(false);
	const [ images, setImages ] = useState([]);
	const [ backImage, setBackImage ] = useState('');
	const [ frontImage, setFrontImage ] = useState('');
	const [ transitionTime ] = useState(5);
	const [ animationTime ] = useState(2);
	const [ index, setIndex ] = useState(0);

	useEffect(() => {
		const getImages = async () => {
			const appService = new AppService();
			const { data } = await appService.getImages();
			if (data.length) {
				setImages(data);
				setBackImage(`http://localhost:5000/albums/image/${data[index]['_id']}`);
				setIndex(1);
				setFrontImage(`http://localhost:5000/albums/image/${data[index]['_id']}`);
			}
		};

		getImages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		() => {
			const interval = setInterval(() => {
				//console.log(`This will run each ${transitionTime} second!`);
				setBackAndFrontImages();
			}, 1000 * transitionTime);

			const setBackAndFrontImages = () => {
				if (images.length) {
					setFrontImageHidden(!frontImageHidden);
					const timer = setTimeout(() => {
						setIndex(index + 1 >= images.length ? 0 : index + 1);
						//console.log(`This will run after ${animationTime} second!`, `current index ${index} of ${images.length}`);
						if (frontImageHidden) {
							setFrontImage(`http://localhost:5000/albums/image/${images[index]['_id']}`);
						} else {
							setBackImage(`http://localhost:5000/albums/image/${images[index]['_id']}`);
						}
						clearTimeout(timer);
					}, 1000 * animationTime);
				}
			};
			return () => clearInterval(interval);
		},
		[ animationTime, frontImageHidden, images, index, transitionTime ]
	);

	return (
		<div className="container">
			<div
				className="background"
				style={{ backgroundImage: frontImageHidden ? `url(${frontImage})` : `url(${backImage})` }}
			>
				<img
					className={`${frontImageHidden ? 'fade-out' : 'fade-in'}`}
					style={{ animationDuration: `${animationTime}s` }}
					src={backImage}
					alt={backImage}
				/>
				<img
					className={`${!frontImageHidden ? 'fade-out' : 'fade-in'}`}
					style={{ animationDuration: `${animationTime}s` }}
					src={frontImage}
					alt={frontImage}
				/>
			</div>
			<div
				className={`image-container ${frontImageHidden ? 'fade-out' : 'fade-in'}`}
				style={{ animationDuration: `${animationTime}s` }}
			>
				<img src={backImage} alt={backImage} />
			</div>
			<div
				className={`image-container ${!frontImageHidden ? 'fade-out' : 'fade-in'}`}
				style={{ animationDuration: `${animationTime}s` }}
			>
				<img src={frontImage} alt={frontImage} />
			</div>

			{/* <pre>frontImageHidden = {frontImageHidden.toString()}</pre>
			<pre>transitionTime = {transitionTime}</pre>
			<pre>animationTime = {animationTime}</pre>
			<pre>index = {index}</pre>
			<input
				type="number"
				name="transitionTime"
				id="transitionTime"
				value={transitionTime}
				onChange={(e) => setTransitionTime(e.target.valueAsNumber)}
			/>
			<input
				type="number"
				name="animationTime"
				id="animationTime"
				value={animationTime}
				onChange={(e) => setAnimationTime(e.target.valueAsNumber)}
			/> */}
		</div>
	);
}

export default App;
