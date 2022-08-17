import React, { FC } from "react"
import parse from "html-react-parser"
import { JSX } from "@emotion/react/dist/declarations/types/jsx-runtime"
import { IFrameProps } from "types/YouTube"
import { Iframe, IFrameContainer } from "components/YouTube/emotion"

interface YouTubeVideoProps {
	embedHtml: string
	title: string
}

const YouTube: FC<YouTubeVideoProps> = ({ embedHtml, title }) => {
	const iframe = parse(embedHtml) as JSX.Element

	const props: IFrameProps = iframe.props
	return (
		<IFrameContainer>
			<Iframe
				title={title}
				allowFullScreen
				src={props.src}
				allow={props.allow}
				frameBorder={props.frameBorder}

			/>
		</IFrameContainer>
	)
}

export default YouTube
