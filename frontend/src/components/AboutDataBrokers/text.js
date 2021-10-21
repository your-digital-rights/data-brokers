import { FormattedMessage } from "react-intl";

const Title = <FormattedMessage id="aboutDataBrokers.title" defaultMessage="Why Data Brokers?" />;

const TitleImgAlt = (
  <FormattedMessage
    id="aboutDataBrokers.imgAlt"
    defaultMessage="A graphic representing data brokers"
  />
);

const WhatAreDataBroekrsTitle = (
  <FormattedMessage id="aboutDataBrokers.whatAreDataBroekrsTitle" defaultMessage="Data Brokers" />
);

const WhatAreDataBroekrsBody = (
  <FormattedMessage
    id="aboutDataBrokers.whatAreDataBroekrs"
    defaultMessage="are companies which collect personal data from various sources and then license this data to other organizations, typically without the knowledge or consent of the individuals involved."
  />
);

const ImpactTitle = (
  <FormattedMessage id="aboutDataBrokers.impactTitle" defaultMessage="They" />
);

const ImpactBody = (
  <FormattedMessage
    id="aboutDataBrokers.impact"
    defaultMessage="are a key enabler of the growing loss of privacy, rampant surveillance capitalism, micro-targeting and misinformation and the addictive nature of digital experiences."
  />
);

export {
  Title,
  TitleImgAlt,
  WhatAreDataBroekrsTitle,
  WhatAreDataBroekrsBody,
  ImpactTitle,
  ImpactBody,
};
