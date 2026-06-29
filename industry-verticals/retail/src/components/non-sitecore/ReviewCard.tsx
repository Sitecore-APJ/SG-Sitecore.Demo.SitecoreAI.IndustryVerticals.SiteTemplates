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
      <div className="aspect-square min-h-80 w-full">
        <ContentSdkImage className="image-cover" field={props.fields.ReviewImage} />
      </div>
      <div className="px-3">
        <div className="bg-background border-border relative -top-12 flex min-h-60 flex-col items-center justify-between border p-6 text-center">
          <div className="bg-background border-border absolute -top-8 flex h-14 w-14 items-center justify-center rounded-full border">
            {props.fields.Avatar.value?.src || props.isPageEditing ? (
              <ContentSdkImage
                width={48}
                height={48}
                field={props.fields.Avatar}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="bg-background-muted flex h-12 w-12 items-center justify-center rounded-full">
                <User className="text-foreground-muted size-6" />
              </div>
            )}
          </div>
          <div className="pt-4">
            <div className="font-heading text-center text-lg font-medium capitalize">
              <Text field={props.fields.ReviewerName} />
            </div>
            <div className="text-foreground-muted text-center text-xs tracking-wide uppercase">
              <Text field={props.fields.Caption} />
            </div>
          </div>
          <div className="text-foreground-light text-center text-sm leading-relaxed">
            <Text field={props.fields.Description} />
          </div>
          <StarRating rating={props.fields.Rating.value} className="!text-gold" />
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
