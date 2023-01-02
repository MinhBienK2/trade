export const quote = [
  {
    cite: 'Benjamin Franklin',
    content: 'Đầu tư vào tri thức đem lại lợi nhuận cao nhất',
  },
  {
    cite: 'Brian Tracy',
    content:
      'Hãy đầu tư ba phần trăm thu nhập của bạn vào chính bạn (tự phát triển bản thân), để bảo đảm tương lai của mình.',
  },
  {
    cite: 'Jean Jacques Rousseau',
    content:
      'Tiền là hạt giống của tiền, và đồng ghi nê đầu tiên đôi khi khó kiếm hơn một triệu đồng thứ hai.',
  },
  {
    cite: 'Jason Goldberg',
    content:
      'Luôn luôn chọn nhà đầu tư dựa vào việc bạn muốn làm việc với ai, kết bạn với ai, và nhận được lời khuyên từ ai. Đừng bao giờ chọn nhà đầu tư dựa vào sự định giá.',
  },
  {
    cite: 'Jack Ma',
    content: 'Triết lý đầu tư của tôi là: đừng mất tiền.',
  },
  {
    cite: 'Thomas Jefferson',
    content:
      'Hãy coi trọng những đồng xu của bạn: Những đồng đô la sẽ tự dưỡng mình.',
  },
  {
    cite: 'Warren Buffett',
    content:
      'Những khoản đầu tư tốt nhất bạn có thể lập là đầu tư vào bản thân mình… Bạn càng học hỏi, bạn sẽ càng kiếm được nhiều tiền.',
  },
  {
    cite: 'John Maynard Keynes',
    content: 'Thà rằng gần đúng còn hơn chính xác sai.',
  },
  {
    cite: 'Henry Ford',
    content:
      'Tiền bạc giống như tay hay chân – hãy sử dụng nó, không sẽ đánh mất nó.',
  },
  {
    cite: 'Jim Rohn',
    content:
      'Người giàu đầu tư tiền và sử dụng phần còn lại; người nghèo sử dụng tiền và đầu tư phần còn lại. ',
  },
  {
    cite: 'John Maynard Keynes',
    content:
      'Là sai lầm khi nghĩ rằng ta có thể hạn chế rủi ro bằng cách dàn trải quá nhiều giữa những doanh nghiệp mà ta không biết rõ và không có lý do để đặc biệt tin tưởng.',
  },
  {
    cite: 'Warren Buffett',
    content:
      'Nếu bạn không tìm được cách kiếm tiền trong khi ngủ, bạn sẽ làm việc cho tới khi chết.',
  },
];

export function randomQuote() {
  return quote[Math.floor(Math.random() * quote.length)];
}
