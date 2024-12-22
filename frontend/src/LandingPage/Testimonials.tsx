import React from 'react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Kenzie Edgar",
            img: "https://i.pravatar.cc/100?img=1",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos sunt ratione dolor exercitationem minima quas itaque saepe quasi architecto vel! Accusantium, vero sint recusandae cum tempora nemo commodi soluta deleniti."
        },
        {
            name: "Charlie Howse",
            img: "https://i.pravatar.cc/100?img=4",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto inventore voluptatum nostrum atque, corrupti, vitae esse id accusamus dignissimos neque reprehenderit natus, hic sequi itaque dicta nisi voluptatem! Culpa, iusto."
        },
        {
            name: "Nevada Herbertson",
            img: "https://i.pravatar.cc/100?img=5",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, voluptatem porro obcaecati dicta, quibusdam sunt ipsum, laboriosam nostrum facere exercitationem pariatur deserunt tempora molestiae assumenda nesciunt alias eius? Illo, autem!"
        }
    ];

    return (
        <div className="min-w-screen min-h-screen bg-mine-shaft-950 text-bright-sun-100">
            <div className="w-full border-t border-b px-5 py-16 md:py-24 border-mine-shaft-700">
                <div className="w-full max-w-6xl mx-auto">
                    <div className="text-center max-w-xl mx-auto">
                        <h1 className="text-6xl md:text-7xl font-bold mb-5 text-bright-sun-400">What people <br />are saying.</h1>
                        <h3 className="text-xl mb-5 font-light text-bright-sun-400">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        <div className="text-center mb-10">
                            <hr/><hr /><hr />
                        </div>
                    </div>
                    <div className="-mx-3 md:flex items-start">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="px-3 md:w-1/3">
                                <div className="w-full mx-auto rounded-lg border p-5 font-light mb-6 bg-mine-shaft-800 border-mine-shaft-700 text-bright-sun-200">
                                    <div className="w-full flex mb-4 items-center">
                                        <div className="overflow-hidden rounded-full w-10 h-10 bg-mine-shaft-950 border border-mine-shaft-700">
                                            <img src={testimonial.img} alt={testimonial.name} />
                                        </div>
                                        <div className="flex-grow pl-3">
                                            <h6 className="font-bold text-sm uppercase text-mine-shaft-100">{testimonial.name}</h6>
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <p className="text-sm leading-tight">
                                            <span className="text-lg leading-none italic font-bold text-bright-sun-100 mr-1">"</span>
                                            {testimonial.text}
                                            <span className="text-lg leading-none italic font-bold text-bright-sun-100 ml-1">"</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a title="Buy me a beer" href="https://www.buymeacoffee.com/scottwindon" target="_blank" rel="noopener noreferrer" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                        <img className="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg" alt="Buy me a beer" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Testimonials;
