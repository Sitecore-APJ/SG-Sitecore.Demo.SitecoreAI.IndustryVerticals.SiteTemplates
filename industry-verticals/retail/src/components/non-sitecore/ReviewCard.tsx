import React from 'react';
import {
  Field,
  ImageField,
  Text,
  TextField,
  NextImage as ContentSdkImage,
} from '@sitecore-content-sdk/nextjs';
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
      <div className="border-border aspect-square min-h-80 w-full overflow-hidden rounded-sm border">
        <ContentSdkImage className="image-cover" field={props.fields.ReviewImage} />
      </div>
      <div className="px-3">
        <div className="border-border bg-background relative -top-12 flex min-h-60 flex-col items-center justify-between rounded-sm border p-6 text-center shadow-sm">
          <div className="bg-background border-border absolute -top-8 flex h-14 w-14 items-center justify-center rounded-full border">
            {props.fields.Avatar.value?.src || props.isPageEditing ? (
              <ContentSdkImage
                width={48}
                height={48}
                field={props.fields.Avatar}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="bg-background-muted text-foreground flex h-12 w-12 items-center justify-center rounded-full">
                <User className="size-6" />
              </div>
            )}
          </div>
          <div className="text-foreground-light mt-4">
            <div className="text-center text-base font-bold">
              <Text field={props.fields.ReviewerName} />
            </div>
            <div className="text-accent text-center text-xs font-semibold uppercase">
              <Text field={props.fields.Caption} />
            </div>
          </div>
          <div className="text-foreground-light mt-3 text-center text-sm leading-relaxed">
            <Text field={props.fields.Description} />
          </div>
          <StarRating rating={props.fields.Rating.value} className="mt-4" />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
