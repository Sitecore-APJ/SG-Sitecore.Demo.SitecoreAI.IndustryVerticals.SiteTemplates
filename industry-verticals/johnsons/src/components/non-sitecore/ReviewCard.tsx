import {
  Field,
  ImageField,
  Text,
  TextField,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
import React from 'react';
import StarRating from './StarRating';
import { SitecoreItem } from '@/types/common';
import { User } from 'lucide-react';

type ReviewCardProps = SitecoreItem<{
  Avatar: ImageField;
  ReviewerName: TextField;
  Caption: TextField;
  Description: TextField;
  ReviewImage: ImageField;
  Rating: Field<number>;
}> & { isPageEditing?: boolean };

const ReviewCard = (props: ReviewCardProps) => {
  return (
    <>
      <div className="aspect-square min-h-96 w-full overflow-hidden">
        <ContentSdkImage className="image-cover" field={props.fields.ReviewImage} />
      </div>
      <div className="px-0">
        <div className="border-border bg-background relative -top-10 flex min-h-70 flex-col items-start justify-between border p-8 text-left">
          <div className="bg-background border-border absolute -top-8 left-8 flex h-14 w-14 items-center justify-center border">
            {props.fields.Avatar.value?.src || props.isPageEditing ? (
              <ContentSdkImage
                width={50}
                height={50}
                field={props.fields.Avatar}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="!text-foreground bg-background-muted flex h-full w-full items-center justify-center">
                <User className="size-7" />
              </div>
            )}
          </div>
          <div className="!text-foreground-light mt-4">
            <div className="text-foreground text-lg leading-normal font-medium">
              <Text field={props.fields.ReviewerName} />
            </div>
            <div className="text-sm leading-normal font-normal">
              <Text field={props.fields.Caption} />
            </div>
          </div>
          <div className="!text-foreground-light text-[15px] leading-relaxed font-normal">
            <Text field={props.fields.Description} />
          </div>
          <StarRating rating={props.fields.Rating.value} />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
