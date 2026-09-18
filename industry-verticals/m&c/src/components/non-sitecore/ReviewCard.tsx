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
      <div className="aspect-square min-h-96 w-full overflow-hidden rounded-none">
        <ContentSdkImage className="image-cover rounded-none" field={props.fields.ReviewImage} />
      </div>
      <div className="px-4 md:px-5">
        <div className="border-border bg-background relative -top-12 flex min-h-64 flex-col items-center justify-between border p-6 text-center shadow-none md:p-8">
          {/* Image */}
          <div className="bg-background border-border absolute -top-8 flex h-[60px] w-[60px] items-center justify-center overflow-hidden border">
            {props.fields.Avatar.value?.src || props.isPageEditing ? (
              <ContentSdkImage
                width={50}
                height={50}
                field={props.fields.Avatar}
                className="h-[50px] w-[50px] object-cover"
              />
            ) : (
              <div className="!text-foreground bg-background-muted flex h-[50px] w-[50px] items-center justify-center">
                <User className="size-7" />
              </div>
            )}
          </div>
          <div className="!text-foreground-light mt-4">
            <div className="text-center text-sm leading-normal font-semibold tracking-[0.12em] uppercase">
              <Text field={props.fields.ReviewerName} />
            </div>
            <div className="text-foreground-muted mt-1 text-center text-xs leading-normal font-normal">
              <Text field={props.fields.Caption} />
            </div>
          </div>
          <div className="!text-foreground-light text-center text-sm leading-relaxed font-normal">
            <Text field={props.fields.Description} />
          </div>
          <StarRating rating={props.fields.Rating.value} />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
