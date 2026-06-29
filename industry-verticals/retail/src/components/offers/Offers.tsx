import { Field, Text, useSitecore } from '@sitecore-content-sdk/nextjs';
import { ComponentProps } from 'lib/component-props';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { isParamEnabled } from '@/helpers/isParamEnabled';

interface OfferFields {
  id: string;
  displayName: string;
  name: string;
  url: string;
  fields: {
    OfferText: Field<string>;
  };
}

interface OfferProps extends ComponentProps {
  fields: {
    Offers: OfferFields[];
  };
}

const autoPlayDelay = 5000;

export const Default = (props: OfferProps) => {
  const { page } = useSitecore();

  const id = props.params.RenderingIdentifier;
  const uid = props.rendering.uid;
  const datasource = props.fields?.Offers || [];
  const styles = `${props.params.styles || ''}`.trim();
  const autoPlay = isParamEnabled(props.params.Autoplay);

  if (!datasource.length) {
    return page.mode.isEditing ? (
      <div className={`component offers ${styles}`} id={id}>
        [OFFERS]
      </div>
    ) : (
      <></>
    );
  }

  return (
    <div className={`component offers bg-navy ${styles}`} id={id}>
      <div className="mx-auto flex w-full max-w-3xl items-center justify-center gap-4 px-4 py-2.5">
        <button
          className={`text-background/70 hover:text-background swiper-btn-prev-${uid} transition-colors`}
          name="previous-offer"
          aria-label="Previous offer"
        >
          <ChevronLeft className="size-4" />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={{
            prevEl: `.swiper-btn-prev-${uid}`,
            nextEl: `.swiper-btn-next-${uid}`,
            disabledClass: 'pointer-events-none opacity-50',
          }}
          slidesPerView={1}
          centeredSlides
          noSwiping
          noSwipingClass="no-swiping"
          loop={true}
          autoplay={
            autoPlay
              ? {
                  delay: autoPlayDelay,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          autoHeight
          className="[&_.swiper-slide]:text-background/90 mx-0! w-full transition-all [&_.swiper-slide]:text-xs [&_.swiper-slide]:tracking-wide"
        >
          {datasource.map((offer) => (
            <SwiperSlide key={offer.id} className="no-swiping text-center">
              <Text field={offer.fields.OfferText} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button
          className={`text-background/70 hover:text-background swiper-btn-next-${uid} transition-colors`}
          name="next-offer"
          aria-label="Next offer"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
};
