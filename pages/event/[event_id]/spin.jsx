import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useDebounceFn } from 'ahooks';
import { models } from "mongoose";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import { connect } from "../../../models";

export async function getServerSideProps(context) {
  await connect();
  const { event_id } = context.params;
  const data = await models.Event.findOne({
    event_id,
  });

  if (!data) return { notFound: true }

  const event_participants = await models.Participant.find({
    eventId: data._id,
  });

  return {
    props: {
      event_participants: JSON.stringify(event_participants),
    },
  }
}

export default function Spin({ event_participants }) {
  event_participants = JSON.parse(event_participants);
  const [optCheckbox, setOptCheckbox] = useState("current");
  const canvasRef = useRef(null);
  const textAreaRef = useRef(null);
  const [winnerName, setWinnerName] = useState('_______ ');
  const [isRender, setisRender] = useState(false);
  // const [options, setOptions] = useState([
  const [options, setOptions] = useState(event_participants.map((el, index) => el.name));

  const colors = [
    '#EDFDFD',
    '#2291F7',
    '#FDEFE2',
    '#EC7E18',
    '#F0EDFE',
    '#B13CE8'
  ];
  const startAngle = 0;
  const arc = Math.PI / (options.length / 2);
  const spinArcStart = 10;

  let spinTimeout = null;
  let spinTime = 0;
  let spinTimeTotal = 0;
  let spinAngleStart;
  let ctx;

  function drawRouletteWheel() {
    setisRender(true);
    const canvas = canvasRef.current;
    if (canvas.getContext) {
      const outsideRadius = 200;
      const textRadius = 160;
      const insideRadius = 0;

      ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);

      ctx.font = 'bold 12px Work Sans, sans-serif';

      for (const i = 0; i < options.length; i++) {
        const angle = startAngle + i * arc;
        let index = i > colors.length - 1;
        index = index ? i % colors.length : i;
        ctx.fillStyle = colors[index];

        ctx.beginPath();
        ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
        ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
        ctx.fill();

        ctx.save();
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = -1;
        ctx.shadowBlur = 0;
        ctx.shadowColor = "rgb(220,220,220)";
        ctx.fillStyle = "black";
        ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
          250 + Math.sin(angle + arc / 2) * textRadius);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        const text = options[i];
        ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
        ctx.restore();
      }
    }
  }

  function rotateWheel() {
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
      stopRotateWheel();
      return;
    }
    const spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
    startAngle += (spinAngle * Math.PI / 180);
    drawRouletteWheel();
    spinTimeout = setTimeout(rotateWheel, 30);
  }

  function spin() {
    setWinnerName('_______ ');

    spinAngleStart = Math.random() * 10 + 10;
    spinTime = 0;
    spinTimeTotal = Math.random() * 3 + 4 * 1000;
    rotateWheel();
  }

  function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = startAngle * 180 / Math.PI + 90;
    const arcd = arc * 180 / Math.PI;
    const index = Math.floor((360 - degrees % 360) / arcd);
    ctx.save();

    ctx.font = 'bold 30px Work Sans, sans-serif';
    const text = options[index]
    ctx.fillStyle = "black";
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
    ctx.restore();

    setWinnerName(text);
  }

  function easeOut(t, b, c, d) {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
  }

  const insertParticipants = () => {
    const _opts = [];
    for (let index = 1; index <= 12; index++) {
      _opts.push(`#${index}`);
    }
    setOptions(_opts);

    drawRouletteWheel();
  }

  const { run: textChange } = useDebounceFn(
    /**
     *
     * @param {Event} event
     */
    (event) => {
      if (optCheckbox == "list") {
        setOptions(event.target.value.split("\n").map((el) => el).filter(el => el != ""));
        drawRouletteWheel();
      }
    },
    {
      wait: 100,
    },
  );

  /**
   *
   * @param {Event} event
   */
  const handleCheckChange = (event) => {
    if (event.target.value == 'current') {
      setOptCheckbox("current");
      setOptions(event_participants.map((el, index) => el.name));
      drawRouletteWheel();
    } else {
      setOptCheckbox("list");
      setOptions(textAreaRef.current.value.split("\n").map((el) => el).filter(el => el != ""));
      drawRouletteWheel();
    }
  };

  useEffect(() => {
    if (!isRender) {
      drawRouletteWheel();
    }
  });

  return (
    <>
      <Head>
        <title>Your points</title>
      </Head>

      {/* navbar */}
      <Navbar />
      {/* hero */}

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-5/12">
          <div className="flex items-center justify-center transform scale-60 md:scale-90 lg:scale-100">
            <canvas id="canvas" width="500" height="500" ref={canvasRef}></canvas>
          </div>
        </div>
        <div className="w-full md:w-7/12 p-3 md:p-6 flex flex-col justify-center space-y-6 md:space-y-12">
          <div>
            <h1 className="font-semibold text-5xl text-brand-black">Lucky Draw</h1>
          </div>

          <div>
            <div className="mb-4 flex items-center space-x-2">
              <input
                className="rounded-full text-brand-purple active:bg-brand-purple focus:ring-brand-purple"
                type="radio"
                id="check_current"
                value={"current"}
                defaultChecked={true}
                name="check"
                onChange={handleCheckChange}
              />
              <label htmlFor="check_current">Use current audience</label>
            </div>

            <div className="mb-4 flex items-center space-x-2">
              <input
                className="rounded-full text-brand-purple active:bg-brand-purple focus:ring-brand-purple"
                type="radio"
                id="check_list"
                value={"list"}
                name="check"
                onChange={handleCheckChange}
              />
              <label htmlFor="check_list">Add new list (separate with enter)</label>
            </div>
            <div className="mt-3 flex justify-between space-x-6 ">
              <textarea
                className="w-full rounded border-brand-grey"
                type="text"
                placeholder="Insert item..."
                rows={6}
                onChange={textChange}
                ref={textAreaRef}
              />
            </div>
            <div className="mt-4 flex items-center space-x-3">
              <p>Spin for {winnerName} winners</p>
              <button className="p-2 px-4 bg-brand-purple text-white rounded-full font-semibold text-md" onClick={() => spin()}>Submit</button>
            </div>
          </div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </>
  )
}