// https://www.json-generator.com/

/*
{
  mails: [
    '{{repeat(700, 800)}}',
    {
      id: '{{index(1)}}',
      subject: '{{lorem(3, "words")}}',
      content: '{{lorem(3, "paragraphs")}}',
      sender: {
        name: '{{firstName()}} {{surname()}}',
        email: '{{email()}}'
      },
      label: '{{random("Work", "Design", "Family", "Friend", "Office")}}',
      spam: '{{bool()}}',
      sent: '{{bool()}}',
      important: '{{bool()}}',
      attachment: '{{random(null, null, null, "http://placehold.it/32x32")}}',
      sentAt: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}',
      readAt: '{{random(null, null, date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z"))}}',
      deletedAt: '{{random(null, null, date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z"))}}'
    }
  ],
  profile: {
    id: '{{objectId()}}',
    firstName: '{{firstName()}}',
    lastName: '{{surname()}}',
    email: '{{email()}}',
    avatar: 'https://api.adorable.io/avatars/64/abott@adorable.png'
  }
}
*/