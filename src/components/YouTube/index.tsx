import React, { FC, useEffect, useState } from "react"
import parse from "html-react-parser"
import { JSX } from "@emotion/react/dist/declarations/types/jsx-runtime"
import { IFrameProps } from "types/YouTube"
import { Iframe, IFrameContainer } from "components/YouTube/emotion"

interface YouTubeVideoProps {
	embedHtml: string
	title: string
}

const YouTube: FC<YouTubeVideoProps> = ({ embedHtml, title }) => {

	const [props, setProps] = useState<IFrameProps>({
		src: "",
		frameBorder: "0",
		allow: "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
		allowFullScreen: "true",
	})

	useEffect(() => {
		console.log("useEffect called")
		const iframe = parse(embedHtml) as JSX.Element

		setProps({
			src: iframe.props.src,
			frameBorder: iframe.props.frameBorder,
			allow: iframe.props.allow,
			allowFullScreen: iframe.props.allowFullScreen,

		})

	}, [embedHtml])

	return (
		<IFrameContainer>
			<Iframe title={title} allowFullScreen src={props.src} allow={props.allow} frameBorder={props.frameBorder} />
		</IFrameContainer>
	)
}

export default YouTube
