"use client";
import { eventByIdQueryOptions } from "@/api";
import { Card, Modal } from "@/components";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MouseEvent, useCallback, useMemo, useRef, useState } from "react";
import { BetForm } from "..";

interface Props {
  id: number;
  className?: string;
}

export default function Component({ id, className }: Props) {
  const [betPlaced, setBetPlaced] = useState(false);
  const queryOpt = useMemo(() => eventByIdQueryOptions(id), [id]);
  const { data, isLoading } = useQuery(queryOpt);
  const modal = useRef<HTMLDialogElement>(null);

  const openModal = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    modal.current?.showModal();
  }, []);

  const closeModal = useCallback(() => {
    setBetPlaced(true);
    modal.current?.close();
  }, []);

  if (isLoading) return "loading";
  if (!data) return null;
  const { eventName, odds } = data;
  return (
    <>
      <Link href={`/event/${id}`}>
        <Card title={eventName} className={className}>
          <div className="stat inline-flex p-0">
            <div className="stat-title text-white">Odds</div>
            <div className="stat-value">{odds}</div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn" onClick={openModal} disabled={betPlaced}>
              Place Bet
            </button>
          </div>
        </Card>
      </Link>
      <Modal ref={modal}>
        <BetForm onSubmit={closeModal} />
      </Modal>
    </>
  );
}
