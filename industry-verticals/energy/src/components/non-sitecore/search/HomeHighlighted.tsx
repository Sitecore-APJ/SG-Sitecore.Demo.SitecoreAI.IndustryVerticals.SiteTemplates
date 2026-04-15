import { JSX } from 'react';
import { FilterEqual, WidgetDataType, useSearchResults, widget } from '@sitecore-search/react';
import ArticleCard from './ArticleCard';
import { HOMEHIGHLIGHTED_WIDGET_ID } from '@/constants/search';
import { useSearchTracking, type Events } from '@/hooks/useSearchTracking';

const SEARCH_CONFIG = {
  source: process.env.NEXT_PUBLIC_GRIDWELL_SEARCH_SOURCE as string,
};

export const HomeHighlightedComponent = (): JSX.Element => {
  const {
    queryResult: { data: { content: articles = [] } = {} },
  } = useSearchResults({
    query: (query) => {
      query.getRequest().setSearchFilter(new FilterEqual('type', 'Article'));

      if (SEARCH_CONFIG.source !== '') {
        const sources = SEARCH_CONFIG.source.split('|');
        sources.forEach((source) => {
          query.getRequest().addSource(source.trim());
        });
      }
    },
  });

  const articlesToShow = articles.slice(0, 4);
  const { handleSearch } = useSearchTracking();

  return (
    <div className="bg-background-accent w-full py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="text-foreground border-primary inline-block border-b-2 pb-2 text-2xl font-bold md:text-3xl">
            Highlights
          </h2>
          <p className="text-foreground-muted mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
            Recent updates and featured content from our services.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {articlesToShow.map((a, index) => (
            <ArticleCard
              article={a}
              key={a?.id ?? index}
              index={index}
              onItemClick={(e) =>
                handleSearch(e, {
                  url: a.url,
                  widgetId: HOMEHIGHLIGHTED_WIDGET_ID,
                  entityType: 'content',
                  events: ['EntityPageView', 'SearchClickEvent'] as Events[],
                  entityId: a.id,
                  itemIndex: index,
                })
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default widget(HomeHighlightedComponent, WidgetDataType.SEARCH_RESULTS, 'content');
