import { useEffect, useState } from 'react';
import { AppService } from '../../services/App.service';
import './App.css';

function App() {
	const [ frontImageHidden, setFrontImageHidden ] = useState(false);
	const [ images, setImages ] = useState([]);
	const [ backImage, setBackImage ] = useState('');
	const [ frontImage, setFrontImage ] = useState('');
	const [ transitionTime, setTransitionTime ] = useState(5);
	const [ animationTime, setAnimationTime ] = useState(2);
	const [ index, setIndex ] = useState(0);

	useEffect(() => {
		const getImages = async () => {
			const appService = new AppService();
			const { data } = await appService.getImages();
			setImages(data);
			setBackImage(data[index]['download_url']);
			setFrontImage(data[index + 1]['download_url']);
			setIndex(2);
		};

		getImages();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(
		() => {
			const interval = setInterval(() => {
				console.log(`This will run each ${transitionTime} second!`);
				setBackAndFrontImages();
			}, 1000 * transitionTime);

			const setBackAndFrontImages = () => {
				if (images.length) {
					setFrontImageHidden(!frontImageHidden);
					const timer = setTimeout(() => {
						console.log(`This will run after ${animationTime} second!`);
						if (frontImageHidden) {
							setFrontImage(images[index]['download_url']);
						} else {
							setBackImage(images[index]['download_url']);
						}
						setIndex(index + 1 !== images.length ? index + 1 : 0);
						clearTimeout(timer);
					}, 1000 * animationTime);
				}
			};
			return () => clearInterval(interval);
		},
		[ animationTime, frontImageHidden, images, index, transitionTime ]
	);

	return (
		<div>
			<div
				className={`${frontImageHidden ? 'fade-out' : 'fade-in'}`}
				style={{ animationDuration: `${animationTime}s` }}
			>
				<img src={backImage} alt={backImage} />
			</div>
			<div
				className={`fade-in-image ${!frontImageHidden ? 'fade-out' : 'fade-in'}`}
				style={{ animationDuration: `${animationTime}s` }}
			>
				<img src={frontImage} alt={frontImage} />
			</div>

			<pre>frontImageHidden = {frontImageHidden.toString()}</pre>
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
			/>
		</div>
	);
}

export default App;
