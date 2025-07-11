/** @jsxImportSource @emotion/react */
"use client";

import { CloudAssetType } from "@/common/types/cloud";
import { type FC } from "react";
import ImagesSwapper from "../../HOC/ImagesSwapper/ImagesSwapper";
import VideoLoader from "../../HOC/assets/VideoLoader";
import ClickTxtLonger from "../../elements/ClickTxtLonger";
import SubTitle from "../../elements/SubTitle";
import PreviewMarkdown from "../../HOC/PreviewMarkdown/PreviewMarkdown";
import Title from "../../elements/Title";

type PropsType = {
  title: string;
  images: CloudAssetType[];
  video?: CloudAssetType | null;
  description?: string | null;
  markdown: string;
  Content: React.ReactNode;
  Header?: React.ReactNode;
};

const PageItemShape: FC<PropsType> = ({
  images,
  video,
  title,
  description,
  markdown,
  Content,
  Header,
}) => {
  return (
    <div className="w-full grid grid-cols-1 gap-10">
      <Title {...{ title }} />

      {Header}

      <ImagesSwapper
        {...{
          urls: images.map((img) => img.url),
        }}
      />

      <div className="w-full grid grid-cols-1 gap-6">
        <div className="w-full flex flex-col gap-2">
          <SubTitle
            {...{
              txt: "Description",
            }}
          />

          <ClickTxtLonger
            {...{
              description,
            }}
          />
        </div>

        <div className="w-full grid grid-cols-1 gap-2">
          <SubTitle
            {...{
              txt: "Markdown",
            }}
          />

          <PreviewMarkdown {...{ data: markdown }} />
        </div>

        {Content}
      </div>

      <div className="w-full aspect-[16/9] max-w-[800px] justify-self-center mt-[25px]">
        <VideoLoader
          {...{
            src: video?.url,
          }}
        />
      </div>
    </div>
  );
};

export default PageItemShape;
